package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Contactphone;
import com.bluntsoftware.app.modules.karateschool.repository.ContactphoneRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolContactphoneService")
@RequestMapping(value = "/karateschool/contactphone")
@Transactional
@Qualifier("karateschool")

public class ContactphoneService extends CustomService<Contactphone,Integer, ContactphoneRepository> {


}
