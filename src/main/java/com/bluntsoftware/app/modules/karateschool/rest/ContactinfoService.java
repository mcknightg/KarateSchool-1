package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Contactinfo;
import com.bluntsoftware.app.modules.karateschool.repository.ContactinfoRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolContactinfoService")
@RequestMapping(value = "/karateschool/contactinfo")
@Transactional
@Qualifier("karateschool")

public class ContactinfoService extends CustomService<Contactinfo,Integer, ContactinfoRepository> {


}
