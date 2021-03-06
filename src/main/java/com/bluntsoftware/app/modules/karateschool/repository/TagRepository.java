package com.bluntsoftware.app.modules.karateschool.repository;

import com.bluntsoftware.app.modules.karateschool.domain.Tag;
import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.beans.factory.annotation.Qualifier;
/**
* Repository interface for table: Tag.
* @author autogenerated
*/

@Repository("karateschoolTagRepository")
@Qualifier("karateschool")
//@RepositoryRestResource(collectionResourceRel="karateschool.Tag", path="karateschool/Tag")
public interface TagRepository extends GenericRepository<Tag,Integer>  {

}