package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Contactweb;
import com.bluntsoftware.app.modules.karateschool.repository.ContactwebRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolContactwebService")
@RequestMapping(value = "/karateschool/contactweb")
@Transactional
@Qualifier("karateschool")

public class ContactwebService extends CustomService<Contactweb,Integer, ContactwebRepository> {


}
