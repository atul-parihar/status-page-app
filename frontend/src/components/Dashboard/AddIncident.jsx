import React, { useEffect, useState } from 'react';
import { fetchIncidentsWithoutAuth, fetchServicesWithoutAuth } from '../../utils/api';
import IncidentList from './IncidentList';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddIncident = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [servicesData, setServicesData] = useState([]);
  const [incidentsData, setIncidentsData] = useState([]);
  const [associatedService, setAssociatedService] = useState('');

  // Set the default selected option when servicesData is updated
  useEffect(() => {
    if (servicesData?.length > 0) {
      setAssociatedService(servicesData[0]._id); // Set the first service's ID as default
    }
  }, [servicesData]);

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

    (async () => {
      try {
        const data = await fetchIncidentsWithoutAuth();
        setIncidentsData(data);
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setError('Failed to fetch incidents. Please try again later.');
      }
    })();
  }, [success]);

  const handleIncidentDelete = (incidentId) => {
    setIncidentsData((prevData) => prevData.filter((incident) => incident._id !== incidentId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const incidentData = { title, description, status, associatedService };
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(incidentData),
      });

      if (!response.ok) {
        throw new Error('Failed to add incident');
      }

      setTitle('');
      setDescription('');
      setStatus('Open');
      setAssociatedService('');

      setSuccess('Incident added successfully!');
      setError('');
    } catch (err) {
      console.error('Error adding incident:', err);
      setError('Failed to add incident. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <div className="bg-white p-6 rounded shadow-md w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Incident</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Incident Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <Textarea
            placeholder="Incident Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <select
            value={associatedService}
            onChange={(e) => setAssociatedService(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            {servicesData?.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
            <option value="Investigating">Investigating</option>
            <option value="Monitoring">Monitoring</option>
          </select>
          <Button type="submit" className="w-full p-2 bg-red-500 text-white rounded">
            Add Incident
          </Button>
          {success && <p className="text-green-500 text-center">{success}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
      <div className="bg-white p-4 rounded shadow-md w-full max-w-5xl">
        <h3 className="text-xl font-bold mb-4">Incident List</h3>
        <IncidentList incidents={incidentsData} onDelete={handleIncidentDelete} setIncidentsData={setIncidentsData} />
      </div>
    </div>
  );
};

export default AddIncident;