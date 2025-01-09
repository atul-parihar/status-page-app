import React, { useEffect, useState } from 'react';
import { fetchServicesWithoutAuth } from '../../utils/api';
import ServiceList from './ServiceList';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddService = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Operational');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [servicesData, setServicesData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = { name, status };
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error('Failed to add service');
      }

      setName('');
      setStatus('Operational');

      setSuccess('Service added successfully!');
      setError('');
    } catch (err) {
      console.error('Error adding service:', err);
      setError('Failed to add service. Please try again.');
      setSuccess('');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchServicesWithoutAuth();
        setServicesData(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services. Please try again later.');
      }
    })();
  }, [success]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <div className="bg-white p-6 rounded shadow-md w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Operational">Operational</option>
            <option value="Degraded Performance">Degraded Performance</option>
            <option value="Partial Outage">Partial Outage</option>
            <option value="Major Outage">Major Outage</option>
          </select>
          <Button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
            Add Service
          </Button>
          {success && <p className="text-green-500 text-center">{success}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
      <div className="bg-white p-4 rounded shadow-md w-full max-w-5xl">
        <h3 className="text-xl font-bold mb-4">Service List</h3>
        <ServiceList services={servicesData} setServicesData={setServicesData} />
      </div>
    </div>
  );
};

export default AddService;
