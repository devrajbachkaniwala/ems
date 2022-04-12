//import { TPrice } from 'pages/organization/create-event';
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState
} from 'react';

/* type TFormState = {
  price: number;
  currency: string;
  maxLimit: number;
};

const initialFormState: TFormState = {
  price: 0,
  currency: '',
  maxLimit: 0
}; */

/* type TPriceFormProps = {
  price: TPrice;
  id: number;
  setPrice: Dispatch<SetStateAction<TPrice[]>>;
}; */

const PriceForm: FC = (props) => {
  //const [formValues, setFormValues] = useState<TPriceValues>(price.values);
  //const [formErrors, setFormErrors] = useState<TPriceErrors>(price.errors);
  /* 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice((prevState) => {
      return prevState.map((price, index) => {
        if (index === id) {
          return {
            ...price,
            [e.target.name]: e.target.value
          };
        }
        console.log(index, id);
        return price;
      });
    });
  }; */

  const validate = () => {};

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <form className='border-2 my-3'>
      <div>
        {/* {formErrors.price && (
          <span className='text-red-600 text-lg'>{formErrors.price}</span>
        )} */}
        <label htmlFor='price'>Price</label>
        <input
          type='text'
          name='price'
          id='price'
          onChange={() => console.log('change')}
        />
      </div>
      <div>
        <label htmlFor='currency'>Currency</label>
        <input
          type='text'
          name='currency'
          id='currency'
          onChange={() => console.log('change')}
        />
      </div>
      <div>
        <label htmlFor='maxLimit'>Max Limit</label>
        <input
          type='text'
          name='maxLimit'
          id='maxLimit'
          onChange={() => console.log('change')}
        />
      </div>
      <button
        type='button'
        className='hidden'
        onClick={validate}
        name='validate'
      >
        Validate
      </button>
      <button
        type='submit'
        className='hidden'
        onClick={handleSubmit}
        name='submit'
      >
        Validate
      </button>
    </form>
  );
};

export default PriceForm;
