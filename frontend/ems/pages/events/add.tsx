import PriceForm from 'components/createEventPage/priceForm';
import { NextPage } from 'next';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { MdAdd, MdAddCircleOutline, MdImage } from 'react-icons/md';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import { imageValidator } from 'utils/imageValidator';
import { FaTrashAlt } from 'react-icons/fa';
import AddEditEvent from 'components/addEditEvent';
import { EventList_events } from '@/services/eventService/__generated__/EventList';
import Header from 'components/header';
import Footer from 'components/footer';
import { TPageLayout } from 'types/pageLayout';
import { ProtectedRoute } from 'components/protectedRoute';

const AddEvent: NextPage & TPageLayout = () => {
  return (
    <>
      <AddEditEvent />
    </>
  );
};

export default AddEvent;

AddEvent.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute role='organization'>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};
