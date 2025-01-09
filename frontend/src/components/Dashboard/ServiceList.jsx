import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchServicesWithoutAuth } from '@/utils/api';

const ServiceList = ({ services, setServicesData }) => {
  const [serviceToUpdate, setServiceToUpdate] = useState(null);  // Track the service being updated
  const [updatedName, setUpdatedName] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Handle updating service
  const handleServiceUpdate = async (e) => {
    e.preventDefault();

    if (!updatedName || !updatedStatus) {
      alert("Please fill all fields");
      return;
    }

    const updatedService = { name: updatedName, status: updatedStatus };
    try {
      const response = await fetch(`http://localhost:8000/api/services/${serviceToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update service:', errorData.message);
        return;
      }

      const updatedServiceData = await response.json();

      // Update the local state with the updated service data
      setServicesData((prevServices) =>
        prevServices.map((service) =>
          service._id === updatedServiceData._id ? updatedServiceData : service
        )
      );

      // Clear the update modal state
      setServiceToUpdate(null);
      setUpdatedName('');
      setUpdatedStatus('');
      setIsDialogOpen(false); // Close the dialog

      // Optionally, you can refetch the incidents from the backend to ensure you have the latest data
      try {
        const serviceResponse = await fetchServicesWithoutAuth();
        setServicesData(serviceResponse);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services. Please try again later.');
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };


  // Handle deleting service
  const handleServiceDelete = async (serviceId) => {
    // if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete service:", errorData.message);
        return;
      }

      // Remove the deleted service from the local state
      setServicesData((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      );
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Services</h3>

      <table className="min-w-full p-6 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Created At</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Updated At</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Created By</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Action</th>
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
                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => {
                        setServiceToUpdate(service);
                        setUpdatedName(service.name);
                        setUpdatedStatus(service.status);
                        setIsDialogOpen(true);
                      }}>
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Service</DialogTitle>
                        <DialogDescription>
                          Make changes to your service details here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="service-name" className="text-right">
                            Service Name
                          </Label>
                          <Input
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="service-status" className="text-right">
                            Status
                          </Label>
                          <select
                            value={updatedStatus}
                            onChange={(e) => setUpdatedStatus(e.target.value)}
                            className="col-span-3"
                            required
                          >
                            <option value="Operational">Operational</option>
                            <option value="Degraded Performance">Degraded Performance</option>
                            <option value="Partial Outage">Partial Outage</option>
                            <option value="Major Outage">Major Outage</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleServiceUpdate}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => handleServiceDelete(service._id)}>Delete</Button>
                </td>
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
    </div>
  );
};

export default ServiceList;
