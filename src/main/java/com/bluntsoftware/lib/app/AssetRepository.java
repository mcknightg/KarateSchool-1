package com.bluntsoftware.lib.app;

import com.bluntsoftware.app.modules.user_manager.domain.ApplicationUser;
import com.bluntsoftware.lib.security.SecurityUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Alex Mcknight on 4/8/2017.
 *
 */
@Controller("AssetService")
@RequestMapping(value = "/assets")
public class AssetRepository {
    @Autowired
    ApplicationRepository applicationRepository;
    @RequestMapping(
            value = "/get",
            method = { RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    ResponseEntity<InputStreamResource> get(@RequestParam("file") String file,RedirectAttributes redirectAttrs ) throws Exception {
        File asset = new File(getAssetFolder(),file);
        String fileType = Files.probeContentType(asset.toPath());
        FileInputStream fs = new FileInputStream(asset);
        return ResponseEntity.ok()
                .contentLength(asset.length())
                .contentType(MediaType.parseMediaType(fileType))
                .body(new InputStreamResource(fs));
    }

    @RequestMapping(
            value = "/remove",
            method = { RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    Map remove(@RequestParam("file") String file ) throws Exception {
        File asset = new File(getAssetFolder(),file);

         if(asset.isDirectory()){
             FileUtils.deleteDirectory(asset);
         }else{

             asset.delete();
         }
        Map ret = new HashMap();
        ret.put("status","success");
        ret.put("deletefile",asset.getAbsolutePath());
        return ret;
    }


    //@RequestParam("file") MultipartFile[] files
    @RequestMapping(
            value = "/multi_upload",
            method = { RequestMethod.POST},
            produces = "application/json;charset=utf8")
    @ResponseBody
    Map multi_upload(@RequestParam("file") MultipartFile[] files, @RequestParam("dir") String dir, RedirectAttributes redirectAttributes) throws IOException {
        File destinationFolder = getFolder(dir);
        for (MultipartFile file : files) {
            file.transferTo(new File(destinationFolder, file.getOriginalFilename()));
        }
        Map<String,String> ret = new HashMap<>();
        ret.put("status","success");
        return ret;

    }
    @RequestMapping(
            value = "/upload",
            method = { RequestMethod.POST})
    @ResponseBody
    Map upload(@RequestParam("file") MultipartFile file, @RequestParam("dir") String dir,RedirectAttributes redirectAttributes) throws IOException {
        File destinationFolder = getFolder(dir);
        file.transferTo(new File(destinationFolder,file.getOriginalFilename()));
        Map<String,String> ret = new HashMap<>();
        ret.put("status","success");
        return ret;
    }

    @RequestMapping(
            value = "/mkdirs",
            method = { RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    File newFolder(@RequestParam("dir") String dir) throws IOException {
        File folder = getFolder(dir);
        if(!folder.exists()){
            folder.mkdirs();
        }
        return folder;
    }

    
    @RequestMapping(value = {""}, method = { RequestMethod.GET,RequestMethod.POST}, produces = "text/html;charset=UTF-8")
    void list(@RequestParam(value = "dir", required = false) String dir, HttpServletResponse response) throws Exception {
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        ServletOutputStream out = response.getOutputStream();

        File assetFolder =  getFolder(dir);
        if (assetFolder.exists()) {
            String[] files = assetFolder.list(new FilenameFilter() {
                public boolean accept(File dir, String name) {
                    return name.charAt(0) != '.';
                }
            });

            Arrays.sort(files, String.CASE_INSENSITIVE_ORDER);
            out.print("<ul class=\"jqueryFileTree\" style=\"display: none;\">");
            // All dirs
            for (String file : files) {
                if (new File(assetFolder, file).isDirectory()) {
                    out.print("<li class=\"directory collapsed\"><a href=\"#\" rel=\"" + dir + file + "/\">"
                            + file + "</a><i class='pull-right remove-directory fa fa-remove'></i></li>");
                }
            }
            // All files
            for (String file : files) {
                if (!new File(assetFolder, file).isDirectory()) {
                    int dotIndex = file.lastIndexOf('.');
                    String ext = dotIndex > 0 ? file.substring(dotIndex + 1) : "";
                    out.print("<li class=\"file ext_" + ext + "\"><a href=\"#\" rel=\"" + dir + file + "\">"
                            + file + "</a><i class='pull-right remove-file fa fa-remove'></i></li>");
                }
            }
            out.print("</ul>");
        }

    }
    @RequestMapping(value = {"/folders"}, method = { RequestMethod.GET,RequestMethod.POST}, produces = "text/html;charset=UTF-8")
    void folders(@RequestParam(value = "dir", required = false) String dir, HttpServletResponse response) throws Exception {
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        ServletOutputStream out = response.getOutputStream();

        File assetFolder =  getFolder(dir);

        if (assetFolder.exists()) {
            String[] files = assetFolder.list(new FilenameFilter() {
                public boolean accept(File dir, String name) {
                    return name.charAt(0) != '.';
                }
            });
            Arrays.sort(files, String.CASE_INSENSITIVE_ORDER);
            out.print("<ul class=\"jqueryFileTree\" style=\"display: none;\">");

            // All dirs
            for (String file : files) {

                if (new File(assetFolder, file).isDirectory()) {
                    out.print("<li class=\"directory collapsed\"><a href=\"#\" rel=\"" + dir + file + "/\">"
                            + file + "</a></li>");
                }
            }
            out.print("</ul>");
        }
    }
    private File getFolder(String dir) throws IOException {
        File assetFolder = getAssetFolder();

        if (dir != null && !dir.equalsIgnoreCase("")) {
            if (dir.charAt(dir.length()-1) == '\\') {
                dir = dir.substring(0, dir.length()-1) + "/";
            } else if (dir.charAt(dir.length()-1) != '/') {
                dir += "/";
            }
            dir = java.net.URLDecoder.decode(dir, "UTF-8");

        }else{
            dir = "/";
        }
        return new File(assetFolder,dir);
    }
    
    private File getAssetFolder() throws IOException {
        File applicationFolder = applicationRepository.getApplicationFolder();
        File assetsFolder = new File(applicationFolder,"assets");
        assetsFolder.mkdirs();
        return  assetsFolder;
    }



}
