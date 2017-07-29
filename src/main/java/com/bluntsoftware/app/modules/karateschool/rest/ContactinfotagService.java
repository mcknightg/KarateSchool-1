package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Contactinfotag;
import com.bluntsoftware.app.modules.karateschool.repository.ContactinfotagRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolContactinfotagService")
@RequestMapping(value = "/karateschool/contactinfotag")
@Transactional
@Qualifier("karateschool")

public class ContactinfotagService extends CustomService<Contactinfotag,Integer, ContactinfotagRepository> {


}
