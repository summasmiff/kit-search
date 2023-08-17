import React from 'react';

const KitList = ({ kits }) => {
  return (
    <div className="results-table">
      <table>
        <thead>
          <tr>
            <th>Kit ID</th>
            <th>Status</th>
            <th>FedEx Tracking Code</th>
          </tr>
        </thead>

        <tbody>
          {kits.map((kit) =>
            <tr key={kit.id}>
              <td>{kit.label_id}</td>
              <td>Shipped</td>
              <td>{kit.shipping_tracking_code}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default KitList;
