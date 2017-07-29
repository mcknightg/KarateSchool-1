package com.bluntsoftware.lib.app;

import com.bluntsoftware.lib.nosql.mongo.MongoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;
import org.bson.Document;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * Created by Alex Mcknight on 4/16/2017.
 *
 */

@Repository("ApplicationRepository")
public class ApplicationRepository {

    private final MongoRepository mongoRepository;
    private String appName = "SpringSocialJPAServerApplication";

    @Autowired
    public ApplicationRepository(MongoRepository mongoRepository) {
        this.mongoRepository = mongoRepository;
    }

    public static void main(String[] args) {
        ApplicationRepository app = new ApplicationRepository(new MongoRepository());
        try {
            app.restore(app.backup());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public File backup() throws IOException {
        backUpMongo(getAppName());
        backUpModel();
        File destination = new File(getBackupFolder(), UUID.randomUUID().toString() + ".zip");
        ZipFolder.zip(getApplicationFolder(),destination);
        System.out.println("Application backup Successful @ " + destination.getAbsolutePath());
        return destination;
    }



    public void initialize(){
        try {
            File projectTemplate = new File(getProjectFolder(""),"app_template.zip");
            if(!projectTemplate.exists()){
                File templateFile = getResource("app_template.zip");
                if(templateFile.exists()){
                    restore(templateFile);
                    FileUtils.copyFile(templateFile,projectTemplate);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void restore(File backup) throws IOException {
        File appFolder = getApplicationFolder();
        ZipFolder.unzip(backup,appFolder);
        restoreMongo(getAppName());
        System.out.println("Application restore Successful @ " + appFolder.getAbsolutePath());
    }
    public void backUpModel(){
        File model = null;
        try {
            model = getResource("model.json");
            if(model.exists()){
                FileUtils.copyFile(model,new File(getApplicationFolder(),"model.json"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void backUpMongo(String database){

        try {
            List<Document> flows = mongoRepository.backupCollection(database,"flow");
            //List<Document> connections = mongoRepository.backupCollection(database,"connections");
            List<Document> pages = mongoRepository.backupCollection(database,"pages");
            List<Document> custom_snippets = mongoRepository.backupCollection(database,"custom_snippets");

            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(new File(getProjectFolder("/application/flows"),"flows.json"), flows);
           // mapper.writeValue(new File(getResourceFolder("/application/connections"),"connections.json"), connections);
            mapper.writeValue(new File(getProjectFolder("/application/pages"),"pages.json"), pages);
            mapper.writeValue(new File(getProjectFolder("/application/custom_snippets"),"custom_snippets.json"), custom_snippets);




        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    private void restoreMongo(String database){
        ObjectMapper mapper = new ObjectMapper();
        try {
            List flows =  mapper.readValue(new File(getProjectFolder("/application/flows"),"flows.json"),List.class);
            //List connections = mapper.readValue(new File(getResourceFolder("/application/connections"),"connections.json"),List.class);
            List pages = mapper.readValue(new File(getProjectFolder("/application/pages"),"pages.json"),List.class);
            List custom_snippets = mapper.readValue(new File(getProjectFolder("/application/custom_snippets"),"custom_snippets.json"),List.class);

            mongoRepository.restoreCollection(database,"flow",flows);
            //mongoRepository.restoreCollection(database,"connections",connections);
            mongoRepository.restoreCollection(database,"pages",pages);
            mongoRepository.restoreCollection(database,"custom_snippets",custom_snippets);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public File getBackupFolder() throws IOException {
        return getProjectFolder("backups");
    }
    public File getApplicationFolder() throws IOException {
        return  getProjectFolder("application");
    }

    public File getProjectFolder(String path) {
        File userAppFolder = new File(System.getProperty("java.io.tmpdir"),"catwalk");
        File appFolder = new File(userAppFolder,getAppName());
        File ret =  new File(appFolder,path);
        ret.mkdirs();
        return ret;
    }
    private File getResource(String path) throws IOException {
        Resource rsrc = new ClassPathResource("");
        File resourceFolder = rsrc.getFile();
        File ret =  new File(resourceFolder,path);
        ret.mkdirs();
        return ret;
    }
    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getAppName() {
        return appName;
    }


}
