package com.bluntsoftware.app.modules.user_manager.repository;

import com.bluntsoftware.app.modules.user_manager.domain.ApplicationUser;
import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.beans.factory.annotation.Qualifier;
/**
* Repository interface for table: ApplicationUser.
* @author autogenerated
*/

@Repository("user_managerApplicationUserRepository")
@Qualifier("user_manager")
//@RepositoryRestResource(collectionResourceRel="user_manager.ApplicationUser", path="user_manager/ApplicationUser")
public interface ApplicationUserRepository extends GenericRepository<ApplicationUser,Integer>  {

}