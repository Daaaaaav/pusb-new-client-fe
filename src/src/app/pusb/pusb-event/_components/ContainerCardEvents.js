import React from "react";
import CardTabEvents from "./src/app/pusb/pusb-event/_components/CardTabEvents";
import { Events } from "./src/types/pusb-event-type";
import { ITEMS_PER_PAGE } from "./src/lib/constants";
import Sceleton from "./src/components/shared/Sceleton";

const ContainerCardEvents = ({
  isLatest,
  pusbeEvents,
  error,
  loading,
}: {
  pusbeEvents: Events[];
  error: string | null;
  isLatest: boolean;
  loading: boolean;
}) => {
  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter for PRESENT events and slice to get the top 3
  const presentPUSBEvent = pusbeEvents
    .filter((event) => event.status === "PRESENT")
    .slice(0, 3);

  // Determine events to display based on isLatest
  const pusbEvents = isLatest ? presentPUSBEvent : pusbeEvents || [];

  // Loading skeletons should be shown if loading is true
  const pusbEventsSceleton = loading && pusbEvents.length === 0;

  return (
    <>
      {pusbEventsSceleton ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
          {Array.from({ length: isLatest ? 3 : ITEMS_PER_PAGE }).map(
            (_, index) => (
              <Sceleton key={index} />
            ),
          )}
        </div>
      ) : (
        <div>
          {pusbEvents.length > 0 ? (
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
              {pusbEvents.map((event) => (
                <div key={event.id}>
                  <CardTabEvents pusbEvent={event} />
                </div>
              ))}
            </div>
          ) : (
            <div>No events available.</div>
          )}
        </div>
      )}
    </>
  );
};

export default ContainerCardEvents;
