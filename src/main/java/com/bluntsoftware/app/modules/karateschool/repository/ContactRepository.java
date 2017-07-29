package com.bluntsoftware.app.modules.karateschool.repository;

import com.bluntsoftware.app.modules.karateschool.domain.Contact;
import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.beans.factory.annotation.Qualifier;
/**
* Repository interface for table: Contact.
* @author autogenerated
*/

@Repository("karateschoolContactRepository")
@Qualifier("karateschool")
//@RepositoryRestResource(collectionResourceRel="karateschool.Contact", path="karateschool/Contact")
public interface ContactRepository extends GenericRepository<Contact,Integer>  {

}