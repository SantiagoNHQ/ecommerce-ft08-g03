const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "165991982876-45n7d6tbs2u5tgjo99jsuahrjia0iohg.apps.googleusercontent.com",
      clientSecret: "Vn8_sb2QaGSbTr8fSsDtFQi8",
      callbackURL: "/auth/google/redirect",
    },
    () => {
      //passport callback function
    }
  )
);
