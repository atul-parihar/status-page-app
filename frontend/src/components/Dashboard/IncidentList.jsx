import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchIncidentsWithoutAuth } from '@/utils/api';

const IncidentList = ({ incidents, onDelete, setIncidentsData }) => {
  console.log("incidents: ", incidents);

  const [incidentToUpdate, setIncidentToUpdate] = useState(null);  // Track the incident being updated
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleIncidentUpdate = async (e) => {
    e.preventDefault();

    if (!updatedTitle || !updatedDescription || !updatedStatus) {
      alert("Please fill all fields");
      return;
    }

    const updatedIncident = { title: updatedTitle, description: updatedDescription, status: updatedStatus };

    try {
      const response = await fetch(`http://localhost:8000/api/incidents/${incidentToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(updatedIncident),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update incident:', errorData.message);
        return;
      }

      const updatedIncidentData = await response.json();
      console.log("updatedIncidentData", updatedIncidentData);
      // Optimistic Update: Update the incident in local state
      setIncidentsData((prevIncidents) =>
        prevIncidents.map((incident) =>
          incident._id === updatedIncidentData._id ? updatedIncidentData : incident
        )
      );

      setIsDialogOpen(false); // Close the dialog
      setIncidentToUpdate(null);
      setUpdatedTitle('');
      setUpdatedDescription('');
      setUpdatedStatus('');
      // Optionally, you can refetch the incidents from the backend to ensure you have the latest data
      try {
        const incidentsResponse = await fetchIncidentsWithoutAuth();
        setIncidentsData(incidentsResponse);
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setError('Failed to fetch incidents. Please try again later.');
      }


    } catch (error) {
      console.error("Error updating incident:", error);
    }
  };

  const handleIncidentDelete = async (incidentId) => {
    // if (!window.confirm("Are you sure you want to delete this incident?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/incidents/${incidentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete incident:", errorData.message);
        return;
      }
      onDelete(incidentId);
      // Remove the deleted service from the local state
      setIncidentsData((prevIncidents) =>
        prevIncidents.filter((incident) => incident._id !== incidentId)
      );
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Incidents</h3>
      <table className="min-w-full p-6 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Service</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Created At</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Updated At</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Created By</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {incidents?.length > 0 ? (
            incidents.map((incident, index) => (
              <tr key={incident.id || index}>
                <td className="border border-gray-300 px-4 py-2">{incident.title}</td>
                <td className="border border-gray-300 px-4 py-2">{incident.description}</td>
                <td className="border border-gray-300 px-4 py-2">{incident.status}</td>
                <td className="border border-gray-300 px-4 py-2">{incident.associatedService?.name}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(incident.createdAt).toLocaleString('en-US')}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(incident.updatedAt).toLocaleString('en-US')}</td>
                <td className="border border-gray-300 px-4 py-2">{incident.createdBy.name}</td>
                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => {
                        setIncidentToUpdate(incident);
                        setUpdatedTitle(incident.title);
                        setUpdatedDescription(incident.description);
                        setUpdatedStatus(incident.status);
                        setIsDialogOpen(true);
                        }}
                      >
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Incident</DialogTitle>
                        <DialogDescription>
                          Make changes to the incident details and click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            value={updatedTitle}
                            className="col-span-3"
                            required
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            value={updatedDescription}
                            className="col-span-3"
                            required
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">
                            Status
                          </Label>
                          <select
                            value={updatedStatus}
                            className="col-span-3"
                            required
                            onChange={(e) => setUpdatedStatus(e.target.value)}
                          >
                            <option value="Open">Open</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Investigating">Investigating</option>
                            <option value="Monitoring">Monitoring</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleIncidentUpdate}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => handleIncidentDelete(incident._id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                No incidents available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;
