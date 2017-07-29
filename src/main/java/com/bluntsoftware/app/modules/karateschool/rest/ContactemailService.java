package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Contactemail;
import com.bluntsoftware.app.modules.karateschool.repository.ContactemailRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolContactemailService")
@RequestMapping(value = "/karateschool/contactemail")
@Transactional
@Qualifier("karateschool")

public class ContactemailService extends CustomService<Contactemail,Integer, ContactemailRepository> {


}
