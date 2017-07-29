catwalkApp.service('$global.services', [
    'KarateschoolContact',
    'KarateschoolAddress',
    'KarateschoolCompany',
    'KarateschoolContactphone',
    'KarateschoolContactemail',
    'KarateschoolContactinfo',
    'KarateschoolContactweb',
    'KarateschoolTag',
    'KarateschoolContactinfotag',
    'UserManagerApplicationAuthority',
    'UserManagerApplicationPersistentToken',
    'UserManagerApplicationUser',
    'UserManagerApplicationUserAuthority',
    'UserManagerAppPassResetToken',
    'Account',
    'AppAPI',
function(
    KarateschoolContact,
    KarateschoolAddress,
    KarateschoolCompany,
    KarateschoolContactphone,
    KarateschoolContactemail,
    KarateschoolContactinfo,
    KarateschoolContactweb,
    KarateschoolTag,
    KarateschoolContactinfotag,
    UserManagerApplicationAuthority,
    UserManagerApplicationPersistentToken,
    UserManagerApplicationUser,
    UserManagerApplicationUserAuthority,
    UserManagerAppPassResetToken,
    Account,
    AppAPI
) {
            this.KarateschoolContact = KarateschoolContact;
            this.KarateschoolAddress = KarateschoolAddress;
            this.KarateschoolCompany = KarateschoolCompany;
            this.KarateschoolContactphone = KarateschoolContactphone;
            this.KarateschoolContactemail = KarateschoolContactemail;
            this.KarateschoolContactinfo = KarateschoolContactinfo;
            this.KarateschoolContactweb = KarateschoolContactweb;
            this.KarateschoolTag = KarateschoolTag;
            this.KarateschoolContactinfotag = KarateschoolContactinfotag;
            this.UserManagerApplicationAuthority = UserManagerApplicationAuthority;
            this.UserManagerApplicationPersistentToken = UserManagerApplicationPersistentToken;
            this.UserManagerApplicationUser = UserManagerApplicationUser;
            this.UserManagerApplicationUserAuthority = UserManagerApplicationUserAuthority;
            this.UserManagerAppPassResetToken = UserManagerAppPassResetToken;
            this.Account = Account;
        this.api = AppAPI;
}
]);
