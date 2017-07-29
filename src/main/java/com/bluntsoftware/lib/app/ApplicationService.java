package com.bluntsoftware.lib.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;

/**
 * Created by Alex Mcknight on 4/16/2017.
 *
 */
@Controller("ApplicationService")
@RequestMapping(value = "/application")
public class ApplicationService {

     private final
     ApplicationRepository applicationRepository;

    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @RequestMapping(
            value = "backup",
            method = { RequestMethod.GET,RequestMethod.POST},
            produces = "application/json")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<InputStreamResource> backup(){
        InputStreamResource isr = null;
        HttpHeaders respHeaders = new HttpHeaders();
        try {
             File backup = applicationRepository.backup();
             respHeaders.setContentType(MediaType.valueOf("application/zip"));
             respHeaders.setContentLength(backup.length());
             respHeaders.setContentDispositionFormData("attachment", applicationRepository.getAppName() + ".zip");
             isr = new InputStreamResource(new FileInputStream(backup));

        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<InputStreamResource>(isr, respHeaders, HttpStatus.OK);
    }

    @RequestMapping(
            value = "restore",
            method = { RequestMethod.GET,RequestMethod.POST},
            produces = "application/json")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    void restore(@RequestParam("file") MultipartFile file){
        try {
            File destinationFolder = this.applicationRepository.getBackupFolder();
            File backup = new File(destinationFolder, UUID.randomUUID().toString() + ".zip");
            file.transferTo(backup);
            this.applicationRepository.restore(backup);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
