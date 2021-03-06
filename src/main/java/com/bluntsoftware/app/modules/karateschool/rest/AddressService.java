package com.bluntsoftware.app.modules.karateschool.rest;



import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import com.bluntsoftware.app.modules.karateschool.domain.Address;
import com.bluntsoftware.app.modules.karateschool.repository.AddressRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller("karateschoolAddressService")
@RequestMapping(value = "/karateschool/address")
@Transactional
@Qualifier("karateschool")

public class AddressService extends CustomService<Address,Integer, AddressRepository> {


}
