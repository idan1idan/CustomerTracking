import type React from "react";
import { getStatusColor } from "./CustomersTable";
import { StatusUpdate } from "./actions";

interface StatusTimelineProps {
  statusUpdates: StatusUpdate[];
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  statusUpdates,
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Status Timeline</h3>
      <div className="space-y-4">
        {statusUpdates.map((update, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${getStatusColor(
                update.status
              )}`}
            />
            <div className="ml-4">
              <p className="font-medium">{update.status}</p>
              <p className="text-sm text-gray-500">
                {new Date(update.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
