package com.bluntsoftware.app.modules.user_manager.repository;

import com.bluntsoftware.app.modules.user_manager.domain.AppPassResetToken;
import com.bluntsoftware.lib.jpa.repository.GenericRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.beans.factory.annotation.Qualifier;
/**
* Repository interface for table: AppPassResetToken.
* @author autogenerated
*/

@Repository("user_managerAppPassResetTokenRepository")
@Qualifier("user_manager")
//@RepositoryRestResource(collectionResourceRel="user_manager.AppPassResetToken", path="user_manager/AppPassResetToken")
public interface AppPassResetTokenRepository extends GenericRepository<AppPassResetToken,Integer>  {

}