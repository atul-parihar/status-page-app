import { useEffect, useState } from "react";
import { fetchIncidentsWithoutAuth, fetchServicesWithoutAuth } from "../../utils/api";


const PublicStatus = () => {
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchServicesWithoutAuth();
        console.log('Fetched services:', data);
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    })();

    (async () => {
      try {
        const data = await fetchIncidentsWithoutAuth();
        console.log('Fetched Incidents:', data);
        setIncidents(data);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Public Status</h2>
      <p className="mb-6">Here you can view the current status of services and incidents.</p>

      <h3 className="text-xl font-semibold">Services</h3>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Created At</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Updated At</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Created By</th>
          </tr>
        </thead>
        <tbody>
          {services?.length > 0 ? (
            services?.map((service) => (
              <tr key={service._id}>
                <td className="border border-gray-300 px-4 py-2">{service.name}</td>
                <td className="border border-gray-300 px-4 py-2">{service.status}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(service.createdAt).toLocaleString('en-US')}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(service.updatedAt).toLocaleString('en-US')}</td>
                <td className="border border-gray-300 px-4 py-2">{service.createdBy.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
                No services available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mb-4">Incidents</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Service</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Created At</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Updated At</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Created By</th>
          </tr>
        </thead>
        <tbody>
          {incidents?.length > 0 ? (
            incidents?.map((incident, index) => (
                <tr key={incident.id || index}>
                  <td className="border border-gray-300 px-4 py-2">{incident.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.status}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.associatedService.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(incident.createdAt).toLocaleString('en-US')}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(incident.updatedAt).toLocaleString('en-US')}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.createdBy?.name}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                No services available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PublicStatus;
