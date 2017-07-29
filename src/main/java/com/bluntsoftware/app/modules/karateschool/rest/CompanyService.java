package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Company;
import com.bluntsoftware.app.modules.karateschool.repository.CompanyRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolCompanyService")
@RequestMapping(value = "/karateschool/company")
@Transactional
@Qualifier("karateschool")

public class CompanyService extends CustomService<Company,Integer, CompanyRepository> {


}
