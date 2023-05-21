const EditProfilePage = {
  staff: {
    listedStaff: "h3",
    linkSideMenu: "ul.gh-nav-manage li:nth-child(5)",
    userToEdit: ".apps-card-app .author",
    inputName: "#user-name",
    email: "#user-email",
    userEditedName: ".apps-grid-cell:last-of-type .apps-card-app-title",
    userEdited: ".apps-grid-cell:last-of-type",
    
    inputLocation: "#user-location",
    facebook: "#user-facebook",
    twitter: "#user-twitter",
    website: "#user-website",
    inputBio: "#user-bio",

    saveBtn: "button=Save",
    leaveBtn: "button=Leave",
    
    saveNewPassBtn: ".button-change-password",
  }
  
};

global.EditProfilePage = EditProfilePage;
