import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { IoMdClose } from 'react-icons/io';
import AuthButton from '@/components/ui/AuthButton';
import { toast } from 'react-toastify';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';
import { useAuthContext } from '@/context/AuthContext';
import { axiosClient } from '@/utils/axiosClient';
import clsx from 'clsx';

export default function AddAdressModel({ className, text = 'Add' }) {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchUserProfile } = useAuthContext();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const initialValues = {
    city: '',
    country: '',
    state: '',
    pin_code: '',
    landmark: '',
  };

  const fetchAllCountries = async () => {
    const data = await GetCountries();
    // console.log(data);
    setCountries(data.map((c) => ({ name: c.name, id: c.id })));
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const onSubmitHandler = async (values, helpers) => {
    try {
      setLoading(true);
      let send_data = { ...values };

      send_data['city'] = values.city.name;
      send_data['country'] = values.country.name;
      send_data['state'] = values.state.name;

      const response = await axiosClient.post('/auth/add-address', send_data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await response.data;
      await fetchUserProfile();
      helpers.resetForm();
      close();
    } catch (e) {
      toast.error(e.response.data.detail || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={clsx(
          className ? className : 'px-3 py-2 bg-blue-500 text-white rounded',
        )}
      >
        {text}
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white text-black   p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="div"
                className="text-base/7 font-medium flex items-center-safe justify-between"
              >
                <h3 className="font-bold">Add Address</h3>
                <button
                  onClick={close}
                  className="text-xl cursor-pointer rounded-full p-2 bg-blue-500 text-white"
                >
                  <IoMdClose />
                </button>
              </DialogTitle>

              <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
                {({ values, setFieldValue }) => {
                  return (
                    <Form>
                      <div className="mb-3 flex flex-col gap-y-2">
                        <label htmlFor="country">Country</label>
                        <select
                          onChange={async (e) => {
                            if (!e.target.value) return;

                            let data = JSON.parse(e.target.value);
                            const states = await GetState(data.id);
                            // console.log(states,"log to ho rha hain");

                            setStates(
                              states.map((c) => ({ id: c.id, name: c.name })),
                            );
                            setFieldValue('country', data);
                          }}
                          as="select"
                          id="country"
                          name="country"
                          className="w-full py-2 px-2 border border-gray-200 rounded bg-gray-50 outline-none"
                        >
                          <option value="">Select</option>
                          {countries.map((cur, i) => {
                            return (
                              <option key={i} value={JSON.stringify(cur)}>
                                {cur.name}
                              </option>
                            );
                          })}
                        </select>
                        <ErrorMessage
                          className="text-red-500"
                          component={'p'}
                          name="country"
                        />
                      </div>

                      <div className="mb-3 flex flex-col gap-y-2">
                        <label htmlFor="state">State</label>
                        <select
                          onChange={async (e) => {
                            if (!e.target.value) return;
                            let data = JSON.parse(e.target.value);

                            let all_cities = await GetCity(
                              values.country.id,
                              data.id,
                            );
                            setCities(
                              all_cities.map((c) => ({
                                name: c.name,
                                id: c.id,
                              })),
                            );
                            setFieldValue('state', data);
                          }}
                          disabled={states.length <= 0}
                          as="select"
                          id="state"
                          name="state"
                          className="w-full py-2 px-2 border border-gray-200 rounded disabled:bg-gray-300 bg-gray-50 outline-none"
                        >
                          <option value="">Select</option>

                          {states.map((cur, i) => {
                            return (
                              <option key={i} value={JSON.stringify(cur)}>
                                {cur.name}
                              </option>
                            );
                          })}
                        </select>
                        <ErrorMessage
                          className="text-red-500"
                          component={'p'}
                          name="state"
                        />
                      </div>

                      <div className="mb-3 flex flex-col gap-y-2">
                        <label htmlFor="city">City</label>
                        <select
                          disabled={cities.length <= 0}
                          onChange={(e) => {
                            if (!e.target.value) return;
                            let data = JSON.parse(e.target.value);
                            setFieldValue('city', data);
                          }}
                          id="city"
                          name="city"
                          className="w-full py-2 px-2 border border-gray-200 rounded disabled:bg-gray-300 bg-gray-50 outline-none"
                        >
                          <option value="">Select</option>

                          {cities.map((cur, i) => {
                            return (
                              <option key={i} value={JSON.stringify(cur)}>
                                {cur.name}
                              </option>
                            );
                          })}
                        </select>
                        <ErrorMessage
                          className="text-red-500"
                          component={'p'}
                          name="city"
                        />
                      </div>
                      <div className="mb-3 flex flex-col gap-y-2">
                        <label htmlFor="landmark">Landmark</label>
                        <Field
                          type="text"
                          id="landmark"
                          name="landmark"
                          className="w-full py-2 px-2 border border-gray-200 rounded bg-gray-50 outline-none"
                          placeholder="Enter Your Landmark"
                        />
                        <ErrorMessage
                          className="text-red-500"
                          component={'p'}
                          name="landmark"
                        />
                      </div>

                      <div className="mb-3 flex flex-col gap-y-2">
                        <label htmlFor="pin_code">Pin Code</label>
                        <Field
                          type="text"
                          id="pin_code"
                          name="pin_code"
                          className="w-full py-2 px-2 border border-gray-200 rounded bg-gray-50 outline-none"
                          placeholder="Enter Your Pin Code"
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              '',
                            );
                          }}
                        />
                        <ErrorMessage
                          className="text-red-500"
                          component={'p'}
                          name="pin_code"
                        />
                      </div>

                      <div className="mb-3">
                        <AuthButton isLoading={loading} text="Add" />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
