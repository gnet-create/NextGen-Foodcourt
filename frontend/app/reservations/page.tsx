'use client';

import { useState } from 'react';
import { tables } from '@/lib/data';

interface Reservation {
  id: string;
  tableId: string;
  customerName: string;
  date: string;
  time: string;
  guestCount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function Reservations() {
  const [selectedTable, setSelectedTable] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showReservations, setShowReservations] = useState(false);
  const [reservedTables, setReservedTables] = useState<string[]>([]);

  // Check if user is logged in
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('userType');

  if (!isLoggedIn) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Please Log In</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          You need to be logged in to make reservations
        </p>
        <a
          href="/signup"
          className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Sign Up Now
        </a>
      </div>
    );
  }
  const availableTables = tables.filter(table => 
    table.status === 'available' && !reservedTables.includes(table.id)
  );

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTable || !reservationDate || !reservationTime || !customerName) {
      alert('Please fill in all required fields!');
      return;
    }

    const selectedTableInfo = tables.find(t => t.id === selectedTable);
    
    const newReservation: Reservation = {
      id: Date.now().toString(),
      tableId: selectedTable,
      customerName,
      date: reservationDate,
      time: reservationTime,
      guestCount,
      status: 'confirmed'
    };
    
    setReservations([...reservations, newReservation]);
    setReservedTables([...reservedTables, selectedTable]);
    
    alert(`Table reserved successfully!\n\nTable: ${selectedTableInfo?.number}\nDate: ${reservationDate}\nTime: ${reservationTime}\nGuests: ${guestCount}`);
    
    // Reset form
    setSelectedTable('');
    setReservationDate('');
    setReservationTime('');
    setCustomerName('');
    setGuestCount(1);
  };

  const cancelReservation = (reservationId: string) => {
    const reservation = reservations.find(res => res.id === reservationId);
    if (reservation) {
      setReservations(reservations.map(res => 
        res.id === reservationId 
          ? { ...res, status: 'cancelled' }
          : res
      ));
      setReservedTables(reservedTables.filter(tableId => tableId !== reservation.tableId));
    }
  };

  const getTableNumber = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    return table?.number || 'Unknown';
  };
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">Table Reservations</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Reserve a shared table in our food court for your dining experience
        </p>
        
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setShowReservations(false)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              !showReservations 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Make Reservation
          </button>
          <button
            onClick={() => setShowReservations(true)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              showReservations 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            My Reservations ({reservations.filter(r => r.status !== 'cancelled').length})
          </button>
        </div>
      </div>

      {!showReservations ? (
        <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Available Tables</h2>
          
          <div className="grid gap-4">
            {tables.map((table) => (
              <div 
                key={table.id} 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  table.status === 'reserved' || reservedTables.includes(table.id)
                    ? 'border-red-200 bg-red-50' 
                    : selectedTable === table.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => table.status === 'available' && !reservedTables.includes(table.id) && setSelectedTable(table.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      Table {table.number}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Capacity: {table.capacity} people
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-lg font-semibold ${
                    table.status === 'available' && !reservedTables.includes(table.id)
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {table.status === 'available' && !reservedTables.includes(table.id) ? 'Available' : 'Reserved'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Make a Reservation</h2>
          
          <form onSubmit={handleReservation} className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Selected Table
              </label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              >
                <option value="">Choose a table...</option>
                {availableTables.map((table) => (
                  <option key={table.id} value={table.id}>
                    Table {table.number} (Capacity: {table.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Time *
                </label>
                <select
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select time...</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="13:30">1:30 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="14:30">2:30 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="15:30">3:30 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="16:30">4:30 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                min="1"
                max="8"
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Reserve Table
            </button>
          </form>
        </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Reservations</h2>
          
          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">No reservations found</p>
              <button
                onClick={() => setShowReservations(false)}
                className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                Make Your First Reservation
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {reservations.map((reservation) => (
                <div 
                  key={reservation.id} 
                  className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                    reservation.status === 'confirmed' 
                      ? 'border-orange-200 bg-orange-50 dark:bg-orange-900/20' 
                      : reservation.status === 'cancelled'
                      ? 'border-red-200 bg-red-50 dark:bg-red-900/20'
                      : 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        Table {getTableNumber(reservation.tableId)}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-lg">
                        <div>
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-semibold">Customer:</span> {reservation.customerName}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-semibold">Date:</span> {reservation.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-semibold">Time:</span> {reservation.time}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <span className="font-semibold">Guests:</span> {reservation.guestCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <span className={`px-4 py-2 rounded-full text-lg font-semibold ${
                        reservation.status === 'confirmed' 
                          ? 'bg-orange-100 text-orange-800' 
                          : reservation.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                      
                      {reservation.status === 'confirmed' && (
                        <button
                          onClick={() => cancelReservation(reservation.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}