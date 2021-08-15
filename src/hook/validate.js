import * as yup from "yup";
export const schemaSignIn = yup.object().shape({
    email:  yup
            .string()
            .required('Email is required.')
            .matches(
               /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
               'Email format invalid.'

            ),
    password:   yup
                .string()
                .required("You must specify a password")
                .matches(
                    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                    'Password minimum 8 characters, at least one letter and one number.'
                ),
  
  });
  export const schemaSignUp = yup.object().shape({
    email:  yup
            .string()
            .required('Email is required.')
            .matches(
               /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
               'Email format invalid.'

            ),
    password:   yup
                .string()
                .required("You must specify a password")
                .matches(
                    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                    'Password minimum 8 characters, at least one letter and one number.'
                ),
    confirmPassword: yup
                    .string()
                    .required("You must specify a password")
                    .oneOf([yup.ref('password'), null], 'Passwords must match')
  });
