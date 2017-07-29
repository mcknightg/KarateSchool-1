package com.bluntsoftware.app.modules.karateschool.config;

import com.bluntsoftware.lib.jpa.repository.support.DefaultRepositoryFactoryBean;
import com.bluntsoftware.lib.jpa.util.DBConnection;
import com.google.common.base.Preconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySources;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;


import javax.sql.DataSource;
import java.util.Properties;


@Configuration( "karateschool_config")
@EnableTransactionManagement
@PropertySources({
    @PropertySource("classpath:karateschool.jdbc.properties"),
    @PropertySource(value="file:${java.io.tmpdir}/KarateSchool/karateschool.jdbc.properties", ignoreResourceNotFound=true)
})

@EnableJpaRepositories(entityManagerFactoryRef = "karateschool_EntityManagerFactory",
                         transactionManagerRef = "karateschool_TransactionManager",
                                  basePackages = {"com.bluntsoftware.app.modules.karateschool.repository"},
                    repositoryFactoryBeanClass = DefaultRepositoryFactoryBean.class )
public class PersistenceConfig {
    @Autowired
    private Environment env;

    public PersistenceConfig() {
        super();
    }
    @Primary
    @Qualifier("karateschool")
    @Bean(name="karateschool_EntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan( "com.bluntsoftware.app.modules.karateschool.domain" );
        final HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());
        return em;
    }
    @Primary
    @Qualifier("karateschool")
    @Bean(name="karateschool_DataSource")
    public DataSource dataSource() {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(Preconditions.checkNotNull(env.getProperty("jdbc.karateschool.driverClassName")));
        dataSource.setUrl(Preconditions.checkNotNull(env.getProperty("jdbc.karateschool.url")));
        dataSource.setUsername(Preconditions.checkNotNull(env.getProperty("jdbc.karateschool.username")));
        dataSource.setPassword(Preconditions.checkNotNull(env.getProperty("jdbc.karateschool.password")));
        DBConnection.createDatabaseIfNotExist(dataSource,Preconditions.checkNotNull(env.getProperty("jdbc.karateschool.driverClassName")));

        return dataSource;
    }
    @Primary
    @Qualifier("karateschool")
    @Bean(name="karateschool_TransactionManager")
    public PlatformTransactionManager transactionManager() {
        final JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
        return transactionManager;
    }
    @Primary
    @Qualifier("karateschool")
    @Bean(name="karateschool_ExceptionTranslation")
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
        return new PersistenceExceptionTranslationPostProcessor();
    }

    final Properties additionalProperties() {
        final Properties hibernateProperties = new Properties();
        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("hibernate.karateschool.hbm2ddl.auto"));
        hibernateProperties.setProperty("hibernate.dialect", env.getProperty("hibernate.karateschool.dialect"));
        hibernateProperties.setProperty("hibernate.ejb.entitymanager_factory_name","karateschool_EntityManagerFactory");

return hibernateProperties;
    }

}
