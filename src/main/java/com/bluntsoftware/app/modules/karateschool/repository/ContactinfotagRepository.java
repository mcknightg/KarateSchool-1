package com.bluntsoftware.app.modules.karateschool.repository;

import com.bluntsoftware.app.modules.karateschool.domain.Contactinfotag;
import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.beans.factory.annotation.Qualifier;
/**
* Repository interface for table: Contactinfotag.
* @author autogenerated
*/

@Repository("karateschoolContactinfotagRepository")
@Qualifier("karateschool")
//@RepositoryRestResource(collectionResourceRel="karateschool.Contactinfotag", path="karateschool/Contactinfotag")
public interface ContactinfotagRepository extends GenericRepository<Contactinfotag,Integer>  {

}