import { FC } from 'react';
import { MdClose } from 'react-icons/md';
import Modal from './modal';

type TOrganizationContactPopUp = {
  closeOrganizationContactPopUp: () => void;
};

const OrganizationContactPopUp: FC<TOrganizationContactPopUp> = ({
  closeOrganizationContactPopUp
}) => {
  return (
    <Modal>
      {/* Modal container */}
      <div className='fixed bg-black bg-opacity-70 z-[1000] top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center'>
        <div className='mx-10 bg-slate-50 rounded-lg text-slate-700 relative'>
          <section className='px-10 py-5 text-center'>
            <h2 className='text-lg text-slate-900 font-bold'>
              Organization Name
            </h2>
            <p>organization@test.com</p>
            <p>1234567890</p>
          </section>
          <MdClose
            onClick={closeOrganizationContactPopUp}
            className='absolute text-lg text-slate-700 top-0 right-0 hover:cursor-pointer'
          />
        </div>
      </div>
    </Modal>
  );
};

export default OrganizationContactPopUp;
