const validPasswordAdmin = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
const validPasswordUser = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const validName = /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i
const validAddress = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9\s,/()-.]*$/i
const valiDob = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/i
export const UserPage = {
    usUserName: {
        presence: {
            allowEmpty: false,
            message: "^Họ và tên không được trống",
        },
        format: {
            pattern: validName,
            flags: "i",
            message: "^Họ và tên không bao gồm số",
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
    usAddress: {
        presence: {
            allowEmpty: false,
            message: "^Địa chỉ không được trống",
        },
        length: {
            minimum: 15,
            message: "^Địa chỉ  quá ngắn",
        },
        format: {
            pattern: validAddress,
            flags: "i",
            message: "^Địa chỉ không bao gồm ký tự đặc biệt ngoài ' / '",
        },

    },
    usPhoneNo: {
        presence: {
            allowEmpty: false,
            message: "^Số điện thoại không được trống",
        },
        numericality: {
            notInteger: true,
            message: "^Số điện thoại không bao gồm ký tự hoặc chữ",
        },
        length: {
            minimum: 10,
            maximum: 10,
            message: "^Số điện thoại phải có 10 số",
        },

    },
};
export const schemaInforOrder = {
    address: {
        presence: {
            allowEmpty: false,
            message: "^Địa chỉ không được trống",
        },
        length: {
            minimum: 15,
            message: "^Địa chỉ quá ngắn",
        },
        format: {
            pattern: validAddress,
            flags: "i",
            message: "^Địa chỉ không bao gồm ký tự đặc biệt ngoài ' / '",
        },
    },

    phone: {
        presence: {
            allowEmpty: false,
            message: "^Số điện thoại không được trống",
        },
        numericality: {
            notInteger: true,
            message: "^Số điện thoại không bao gồm ký tự hoặc chữ",
        },
        length: {
            minimum: 10,
            maximum: 10,
            message: "^Số điện thoại phải có 10 số",
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
            pattern: /^((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
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
export const schemaProduct = {
    proName: {
        presence: {
            allowEmpty: false,
            message: "^Tên sản phẩm không được trống",
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
    proContent: {
        presence: {
            allowEmpty: false,
            message: "^Nội dung không được trống",
        },
        length: {
            minimum: 20,
            message: "^Nội dung không được quá ngắn",
        }

    },
    proBrand: {
        presence: {
            allowEmpty: false,
            message: "^Nhãn hàng không được trống",
        },
        length: {
            minimum: 3,
            message: "^Nhãn hàng không được quá ngắn",
        }

    },
    proPrice: {
        presence: {
            allowEmpty: false,
            message: "^Gía tiền không được trống",
        },
        numericality: {
            notInteger: true,
            message: "^Gía tiền không bao gồm ký tự hoặc chữ",

        },



    },
    category_id: {
        presence: {
            allowEmpty: false,
            message: "^Vui lòng chọn thể loại ",
        },
    },
    featureImgPath: {
        presence: {
            allowEmpty: false,
            message: "^Vui lòng chọn ảnh ",
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
    seImage: {
        presence: {
            allowEmpty: false,
            message: "^Vui lòng chọn ảnh ",
        },
    }



};
export const CategoriesPageValidate = {
    cateName: {
        presence: {
            allowEmpty: false,
            message: "^Category name cannot be left blank",
        },
        length: {
            minimum: 5,
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