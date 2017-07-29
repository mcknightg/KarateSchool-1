package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Contact;
import com.bluntsoftware.app.modules.karateschool.repository.ContactRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolContactService")
@RequestMapping(value = "/karateschool/contact")
@Transactional
@Qualifier("karateschool")

public class ContactService extends CustomService<Contact,Integer, ContactRepository> {


}
