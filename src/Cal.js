import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Button, Modal } from 'antd';
import { Input } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { data } from 'autoprefixer';
import axios from 'axios';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { Fragment, useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Cal() {
  const addEvent = () => {
    axios.post('http://127.0.0.1:3000/post/addpost', event).then((res) => {
      setPost(res.data);
    });
  };
  const [post, setPost] = useState([]);
  const [postDate, setPostDate] = useState('');
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/post/getallpost').then((res) => {
      setPost(res.data.result);
    });
  }, []);

  const accToDate = post.filter((item) => {
    if (postDate.toLocaleString() === item.post_date?.toLocaleString()) {
      return item;
    }
  });
  console.log(accToDate);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [event, setEvent] = useState({
    message: '',
    image: '',
    postDate: '',
  });
  const showModal = (date) => {
    const dateTostring = date.toString();
    setPostDate(date.toLocaleString());
    console.log(date.toLocaleString());
    setEvent({ ...event, postDate: dateTostring });
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  //   let selectedDayMeetings = meetings.filter((meeting) =>
  //     isSameDay(parseISO(meeting.startDatetime), selectedDay)
  //   );

  return (
    <div className='pt-16'>
      <div className='max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6'>
        <div className='md:grid md:grid-cols-2 md:divide-x md:divide-gray-200'>
          <div className='md:pr-14'>
            <div className='flex items-center'>
              <h2 className='flex-auto font-semibold text-gray-900'>
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type='button'
                onClick={previousMonth}
                className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Previous month</span>
                <ChevronLeftIcon
                  className='w-5 h-5'
                  aria-hidden='true'
                />
              </button>
              <button
                onClick={nextMonth}
                type='button'
                className='-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Next month</span>
                <ChevronRightIcon
                  className='w-5 h-5'
                  aria-hidden='true'
                />
              </button>
            </div>

            <div className='grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500'>
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className='grid grid-cols-7 mt-2 text-sm'>
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type='button'
                    onClick={() => {
                      setSelectedDay(day);
                      showModal(selectedDay);
                    }}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className='w-1 h-1 mx-auto mt-1'>
                    {/* {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                      <div className='w-1 h-1 rounded-full bg-sky-500'></div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className='mt-12 md:mt-0 md:pl-14'>
            <h2 className='font-semibold text-gray-900'>
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className='mt-4 space-y-1 text-sm leading-6 text-gray-500'>
              {accToDate.map((item) => {
                return <>{item.message}</>;
              })}
              {/* {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting
                    meeting={meeting}
                    key={meeting.id}
                  />
                ))
              ) : (
                <p>No meetings for today.</p>
              )} */}
            </ol>
          </section>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          title='Title'
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button
              key='back'
              onClick={handleCancel}
            >
              Return
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={loading}
              onClick={() => {
                addEvent();
                handleOk();
              }}
            >
              Submit
            </Button>,
          ]}
        >
          <Input
            placeholder='Basic usage'
            onKeyUp={(e) => {
              setEvent({
                ...event,
                message: e.target.value,
              });
            }}
          />
        </Modal>
      </div>
    </div>
  );
}

// function Meeting({ meeting }) {
//   let startDateTime = parseISO(meeting.startDatetime);
//   let endDateTime = parseISO(meeting.endDatetime);

//   return (
//     <li className='flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100'>
//       <img
//         src={meeting.imageUrl}
//         alt=''
//         className='flex-none w-10 h-10 rounded-full'
//       />
//       <div className='flex-auto'>
//         <p className='text-gray-900'>{meeting.name}</p>
//         <p className='mt-0.5'>
//           <time dateTime={meeting.startDatetime}>
//             {format(startDateTime, 'h:mm a')}
//           </time>{' '}
//           -{' '}
//           <time dateTime={meeting.endDatetime}>
//             {format(endDateTime, 'h:mm a')}
//           </time>
//         </p>
//       </div>
//       <Menu
//         as='div'
//         className='relative opacity-0 focus-within:opacity-100 group-hover:opacity-100'
//       >
//         <div>
//           <Menu.Button className='-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600'>
//             <span className='sr-only'>Open options</span>
//             <DotsVerticalIcon
//               className='w-6 h-6'
//               aria-hidden='true'
//             />
//           </Menu.Button>
//         </div>

//         <Transition
//           as={Fragment}
//           enter='transition ease-out duration-100'
//           enterFrom='transform opacity-0 scale-95'
//           enterTo='transform opacity-100 scale-100'
//           leave='transition ease-in duration-75'
//           leaveFrom='transform opacity-100 scale-100'
//           leaveTo='transform opacity-0 scale-95'
//         >
//           <Menu.Items className='absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none'>
//             <div className='py-1'>
//               <Menu.Item>
//                 {({ active }) => (
//                   <a
//                     href='#'
//                     className={classNames(
//                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                       'block px-4 py-2 text-sm'
//                     )}
//                   >
//                     Edit
//                   </a>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <a
//                     href='#'
//                     className={classNames(
//                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                       'block px-4 py-2 text-sm'
//                     )}
//                   >
//                     Cancel
//                   </a>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Transition>
//       </Menu>
//     </li>
//   );
// }

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];
