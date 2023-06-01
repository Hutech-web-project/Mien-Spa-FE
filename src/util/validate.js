const validPasswordAdmin = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
const validPasswordUser = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const validName = /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i
const validPhone = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/i
const valiDob = /^((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/i
export const UserPage = {
    usUserName: {
        presence: {
            allowEmpty: false,
            message: "^First and last name cannot be blank",
        },
        format: {
            pattern: validName,
            flags: "i",
            message: "^First and last name do not include number",
        },
    },
    usDob: {
        presence: {
            allowEmpty: false,
            message: "^Date of birth cannot be empty",
        },
        format: {
            pattern: valiDob,
            flags: "i",
            message: '^Format is incorrect',
        },

    },
    usPhoneNo: {
        presence: {
            allowEmpty: false,
            message: "^Phone number cannot be empty",
        },
        numericality: {
            notInteger: true,
            message: "^Phone number does not include characters or letters",
        },
        length: {
            minimum: 10,
            maximum: 10,
            message: "^Phone number must have 10 digits",
        },

    },
};
export const OrderPage = {
    orProAddress: {
        presence: {
            allowEmpty: false,
            message: "^Address cannot be empty",
        },
    },

    orProPhoneNo: {
        presence: {
            allowEmpty: false,
            message: "^Phone number cannot be empty",
        },
        numericality: {
            notInteger: true,
            message: "^Phone number does not include characters or letters",
        },
        length: {
            minimum: 10,
            maximum: 10,
            message: "^Phone number must have 10 digits",
        },
        format: {
            pattern: validPhone,
            ags: "i",
            message: '^This phone number is incorrect',
        },

    },

    orProUserName: {
        presence: {
            allowEmpty: false,
            message: "^First and last name cannot be blank",
        },
        format: {
            pattern: validName,
            flags: "i",
            message: "^First and last name do not include number",
        },
    },
}
export const BookingPagevalidate = {
    phone: {  
        presence: {
            allowEmpty: false,
            message: "^Phone number can not be left blank",
        },
        format: {
            pattern: validPhone,
            ags: "i",
            message: '^This phone number is incorrect',
        },
    },
}
export const RegisterPageValidate = {
    username: {
        presence: {
            allowEmpty: false,
            message: "^First and last name cannot be left blank",
        },
        length: {
            minimum: 3,
            message: "^First and last name should not be too short",
        },

        format: {
            pattern: validName,
            flags: "i",
            message: "^Full name without numbers or special characters",
        },
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Password can not be blank",
        },
        length: {
            minimum: 8,
            message: "^Password needs to be at least 8 characters long",
        },
        format: {
            pattern: validPasswordUser,
            flags: "i",
            message: "Password must contain at least\n 1 capital letter,\n 1 lowercase letter"
        }
    },
    confirmPassword: {
        presence: {
            allowEmpty: false,
            message: "^Password cannot be blank",
        },
        equality: {
            attribute: "password",
            message: "^Password does not match",
        },
    },

    email: {
        presence: {
            allowEmpty: false,
            message: "^Email cannot be empty",
        },
        email: {
            message: "^Invalid email format (xxx@xx.xxx)",
        },
    },
};
export const LoginPageValidate = {
    email: {
        presence: {
            allowEmpty: false,
            message: "^Email can not be left blank",
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Password can not be left blank",
        },
    },   
};
export const schemaPassword = {
    password: {
        presence: {
            allowEmpty: false,
            message: "^Mật khẩu không được trống",
        },
        format: {
            pattern: validPasswordUser,
            flags: "i",
            message: "Mật khẩu phải chứa ít nhất\n 1 chữ viết hoa,\n 1 chữ thường,\n 1 số và 1 kí tự đặc biệt"
        }
    },
    confirmPassword: {
        presence: {
            allowEmpty: false,
            message: "^Mật khẩu không được trống",
        },
        equality: {
            attribute: "password",
            message: "^Mật khẩu không trùng khớp",
        },
    },
}
export const ChangePasswordWord = {
    passwordOld: {
        presence: {
            allowEmpty: false,
            message: "^Old password cannot be blank",
        },
    },
    passwordNew: {
        presence: {
            allowEmpty: false,
            message: "^New password cannot be blank",
        },
        format: {
            pattern: validPasswordUser,
            flags: "i",
            message: "Password must contain at least\n 1 capital letter,\n 1 lowercase letter"
        }
    },
    confirmPassword: {
        presence: {
            allowEmpty: false,
            message: "^Confirm password cannot be blank",
        },
        equality: {
            attribute: "passwordNew",
            message: "^Password does not match",
        },
    },
}
export const ProductPageValidatePost = {
    proName: {
        presence: {
            allowEmpty: false,
            message: "^Product name cannot be empty",
        },
        length: {
            minimum: 5,
            maximum: 50,
            message: "^Product name should not be too short or too long",
        },
        format: {
            pattern: validName,
            flags: "i",
            message: "^Product name does not include numbers or special characters",
        },
    },
    proContent: {
        presence: {
            allowEmpty: false,
            message: "^Content cannot be empty",
        },
        length: {
            minimum: 20,
            message: "^Content should not be too short",
        }

    },
    proBrand: {
        presence: {
            allowEmpty: false,
            message: "^Labels cannot be empty",
        },
        length: {
            minimum: 3,
            message: "^Labels should not be too short",
        }

    },
    proPrice: {
        presence: {
            allowEmpty: false,
            message: "^Price cannot be empty",
        },
        numericality: {
            notInteger: true,
            message: "^Price does not include characters or letters",

        },



    },
    featureImgPath: {
        presence: {
            allowEmpty: false,
            message: "^Please choose a photo",
        },
    },
    category_id:{
        presence: {
            allowEmpty: false,
            message: "^Please choose category",
        },
    }
};

export const ProductPageValidatePut = {
    proName: {
        presence: {
            allowEmpty: false,
            message: "^Product name cannot be empty",
        },
        length: {
            minimum: 5,
            maximum: 50,
            message: "^Product name should not be too short or too long",
        },
        format: {
            pattern: validName,
            flags: "i",
            message: "^Product name does not include numbers or special characters",
        },
    },
    proContent: {
        presence: {
            allowEmpty: false,
            message: "^Content cannot be empty",
        },
        length: {
            minimum: 20,
            message: "^Content should not be too short",
        }

    },
    proBrand: {
        presence: {
            allowEmpty: false,
            message: "^Labels cannot be empty",
        },
        length: {
            minimum: 3,
            message: "^Labels should not be too short",
        }

    },
    proPrice: {
        presence: {
            allowEmpty: false,
            message: "^Price cannot be empty",
        },
        numericality: {
            notInteger: true,
            message: "^Price does not include characters or letters",

        },



    },
    category_id:{
        presence: {
            allowEmpty: false,
            message: "^Please choose category",
        },
    }
};
export const schemaService = {
    seName: {
        presence: {
            allowEmpty: false,
            message: "^Tên dịch vụ không được trống",
        },
        length: {
            minimum: 5,
            maximum: 50,
            message: "^Tên sản phẩm không được quá ngắn hoặc quá dài",
        },
        format: {
            pattern: validName,
            flags: "i",
            message: "^Tên sản phẩm không bao gồm số hoặc kí tự đặc biệt",
        },
    },
    seDescription: {
        presence: {
            allowEmpty: false,
            message: "^Nội dung chi tiết không được trống",
        },
        length: {
            minimum: 20,
            message: "^Nội dung không được quá ngắn",
        }

    },
    seNote: {
        presence: {
            allowEmpty: false,
            message: "^Nội dung quy trình không được trống",
        },
        length: {
            minimum: 20,
            message: "^Nội dung không được quá ngắn",
        }

    },
    sePrice: {
        presence: {
            allowEmpty: false,
            message: "^Gía tiền không được trống",
        },
        numericality: {
            notInteger: true,
            message: "^Gía tiền không bao gồm ký tự hoặc chữ",
        },


    },
   



};
export const CategoriesPageValidate = {
    cateName: {
        presence: {
            allowEmpty: false,
            message: "^Category name cannot be left blank",
        },
        length: {
            minimum: 3,
            maximum: 30,
            message: "^Category names can't be too short or too long",
        },
        format: {
            pattern: validName,
            flags: "i",
            message: "^Category names do not include numbers or special characters",
        },
    },

} 