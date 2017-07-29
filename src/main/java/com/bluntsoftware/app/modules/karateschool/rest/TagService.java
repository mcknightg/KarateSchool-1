package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Tag;
import com.bluntsoftware.app.modules.karateschool.repository.TagRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolTagService")
@RequestMapping(value = "/karateschool/tag")
@Transactional
@Qualifier("karateschool")

public class TagService extends CustomService<Tag,Integer, TagRepository> {


}
