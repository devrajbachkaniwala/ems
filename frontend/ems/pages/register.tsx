import userService from "@/services/userService";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { UserValidation } from "../class/UserValidation";
import { TRegisterUser, TUser } from "../types/user";
import { FaPlusCircle, FaRegPlusSquare } from 'react-icons/fa';
import Link from "next/link";

type TFormValues = TRegisterUser & { confirmPassword: string };

type TFormErrors = {
  username?: string | null;
  fullName?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  userPhoto?: string | null;
};

const initialFormValues: TFormValues = {
  username: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  userPhoto: null,
};

const imageValidator = (imgFile: File): boolean => {
  if (!imgFile.type.startsWith("image/")) {
    throw new Error("File should be an image");
  }
  if (imgFile.size > 2_097_152) {
    throw new Error("Image size should be less than 2MB");
  }
  return true;
};

const Register: NextPage = () => {
  const [formValues, setFormValues] = useState<TFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const setUserPhoto = (imgFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      setFormValues({
        ...formValues,
        userPhoto: reader.result,
      });
    };
  };

  const handleUserPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
    try {
      setFormValues({
        ...formValues,
        userPhoto: null,
      });
      if (!e.target.files?.length) {
        setIsSubmit(true);
        setFormErrors({
          ...formErrors,
          userPhoto: null,
        });
        return;
      }

      const file: File = e.target.files[0];

      const isValidImg: boolean = imageValidator(file);

      if (isValidImg) {
        setFormErrors({
          ...formErrors,
          userPhoto: null,
        });
      }
      setIsSubmit(true);
      setUserPhoto(file);
    } catch (err: any) {
      setFormErrors({
        ...formErrors,
        userPhoto: err.message,
      });
      setIsSubmit(false);
    }
  };

  const onImgClick = (e: MouseEvent<HTMLInputElement>): void => {
    imgRef.current?.click();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = async (): Promise<boolean> => {
    const isValidUsername: boolean = await UserValidation.username(
      formValues.username
    )
      .then((res) => {
        setFormErrors((prev) => ({ ...prev, username: null }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prev) => ({ ...prev, username: err.message }));
        return false;
      });

    const isValidFullName: boolean = await UserValidation.fullName(
      formValues.fullName
    )
      .then((res) => {
        setFormErrors((prev) => ({ ...prev, fullName: null }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prev) => ({ ...prev, fullName: err.message }));
        return false;
      });

    const isValidEmail: boolean = await UserValidation.email(formValues.email)
      .then((res) => {
        setFormErrors((prev) => ({ ...prev, email: null }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prev) => ({ ...prev, email: err.message }));
        return false;
      });

    const isValidPassword: boolean = await UserValidation.password(
      formValues.password
    )
      .then((res) => {
        setFormErrors((prev) => ({ ...prev, password: null }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prev) => ({ ...prev, password: err.message }));
        return false;
      });

    const isValidConfirmPassword: boolean =
      await UserValidation.confirmPassword(
        formValues.confirmPassword,
        formValues.password
      )
        .then((res) => {
          setFormErrors((prev) => ({ ...prev, confirmPassword: null }));
          return res;
        })
        .catch((err) => {
          setFormErrors((prev) => ({ ...prev, confirmPassword: err.message }));
          return false;
        });

    if (
      !(
        isSubmit &&
        isValidUsername &&
        isValidFullName &&
        isValidEmail &&
        isValidPassword &&
        isValidConfirmPassword
      )
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const isValidCredentials: boolean = await validate();

      if (!isValidCredentials) {
        console.log("error");
        return;
      }

      const res: TUser = await userService.registerUser(formValues);

      console.log("success");
      console.log(res);
      setErrMsg(null);

      router.push("/login");
    } catch (err: any) {
      setErrMsg(err.message);
    }
  };

  /*   return (
        <div>
            <RegisterForm></RegisterForm>            
        </div>
    ); */

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <form className="form" onSubmit={handleSubmit}>
      <h2 className='form-heading' >Register</h2>
        {errMsg && (
          <span className='input-error'>{errMsg}</span>
        )}

        {formErrors.userPhoto && (
          <span className='input-error'>
            {formErrors.userPhoto}
          </span>
        )}

        <div className='flex justify-center items-center mb-5'>
          <div className="h-[120px] w-[120px] rounded-full bg-slate-200 relative hover:cursor-pointer border-2 border-slate-400 hover:border-slate-700 text-slate-400 hover:text-slate-700" onClick={onImgClick}>
          { formValues.userPhoto && <Image
            src={`${formValues.userPhoto}`}
            alt="userPhoto"
            width={120}
            height={120}
            className="rounded-full w-36 object-cover"
          />}
          <FaRegPlusSquare className='absolute text-2xl text-inherit right-5 bottom-3 z-10' />
          </div>
          <input
            type="file"
            name="userPhoto"
            onChange={handleUserPhoto}
            className='hidden'
            ref={imgRef}
          />
        </div>


        {formErrors.username && (
            <span className='input-error'>
              {formErrors.username}
            </span>
        )}
        <div className="form-group">
          <label htmlFor="username" className="">
            Username
          </label>
          
          <input
            id="username"
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>


        {formErrors.fullName && (
            <span className='input-error'>
              {formErrors.fullName}
            </span>
        )}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        {formErrors.email && (
            <span className='input-error'>
              {formErrors.email}
            </span>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          
          <input
            id="email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        {formErrors.password && (
            <span className='input-error'>
              {formErrors.password}
            </span>
        )}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          
          <input
            id="password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        {formErrors.confirmPassword && (
            <span className='input-error'>
              {formErrors.confirmPassword}
            </span>
        )}

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="Enter confirm password"
          />
        </div>

        <button type="submit" className='btn mt-2'>Register</button>

        <div className='text-center'>
          <Link href={'/login'}>
            <a className='text-slate-700 hover:text-blue-600 focus:outline-none'>Already have an account?</a>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
