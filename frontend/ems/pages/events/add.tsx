import PriceForm from 'components/createEventPage/priceForm';
import { NextPage } from 'next';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { MdAdd, MdAddCircleOutline, MdImage } from 'react-icons/md';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import { imageValidator } from 'utils/imageValidator';
import { FaTrashAlt } from 'react-icons/fa';
import AddEditEvent from 'components/addEditEvent';
import { EventList_events } from '@/services/eventService/__generated__/EventList';

const AddEvent: NextPage = () => {
  return (
    <>
      <AddEditEvent />
    </>
  );
};

export default AddEvent;
