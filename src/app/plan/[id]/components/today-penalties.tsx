import { Accordion } from 'rizzui'
import { HabitPenaltyRecord } from '@/db/models'
import { formatDistance } from 'date-fns'
import { BiDownArrow } from 'react-icons/bi'

export function TodayPenalties({
  penaltyRecords,
}: {
  penaltyRecords?: HabitPenaltyRecord[]
}) {
  return (
    <Accordion>
      <Accordion.Header className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Today&#39;s Penalty Records ({penaltyRecords?.length})
        </span>
        <span className="text-sm text-gray-500">
          <BiDownArrow className="inline-block" />
        </span>
      </Accordion.Header>
      <Accordion.Body className="text-left">
        {penaltyRecords?.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No penalties recorded today</p>
        ) : (
          <div className="space-y-2">
            {penaltyRecords?.map((record, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{record.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatDistance(new Date(record.date.toDate()), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <span className="text-red-500">-{record.points}</span>
              </div>
            ))}
          </div>
        )}
      </Accordion.Body>
    </Accordion>
  )
}
