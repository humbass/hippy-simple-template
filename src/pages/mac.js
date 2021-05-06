const android = {
  "rssi": 0,
  "name": "N52S_069E14",
  "mac": "E1:AE:0C:06:9E:14",
  "uuids": [
    {
      "type": 0,
      "characteristic": [
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "00002a00-0000-1000-8000-00805f9b34fb",
          "properties": 10
        },
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "00002a01-0000-1000-8000-00805f9b34fb",
          "properties": 2
        },
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "00002a04-0000-1000-8000-00805f9b34fb",
          "properties": 2
        },
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "00002aa6-0000-1000-8000-00805f9b34fb",
          "properties": 2
        }
      ],
      "serviceUuid": "00001800-0000-1000-8000-00805f9b34fb"
    },
    {
      "type": 0,
      "characteristic": [],
      "serviceUuid": "00001801-0000-1000-8000-00805f9b34fb"
    },
    {
      "type": 0,
      "characteristic": [
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "00002a29-0000-1000-8000-00805f9b34fb",
          "properties": 2
        },
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "00002a24-0000-1000-8000-00805f9b34fb",
          "properties": 2
        },
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "00002a27-0000-1000-8000-00805f9b34fb",
          "properties": 2
        },
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "00002a28-0000-1000-8000-00805f9b34fb",
          "properties": 2
        }
      ],
      "serviceUuid": "0000180a-0000-1000-8000-00805f9b34fb"
    },
    {
      "type": 0,
      "characteristic": [
        {
          "writeType": 2,
          "permissions": 0,
          "uuid": "8ec90003-f315-4f60-9fb8-838830daea50",
          "properties": 40
        }
      ],
      "serviceUuid": "0000fe59-0000-1000-8000-00805f9b34fb"
    },
    {
      "type": 0,
      "characteristic": [
        {
          "writeType": 1,
          "permissions": 0,
          "uuid": "0000ffa1-0000-1000-8000-00805f9b34fb",
          "properties": 22
        },
        {
          "writeType": 1,
          "permissions": 0,
          "uuid": "0000ffa2-0000-1000-8000-00805f9b34fb",
          "properties": 4
        }
      ],
      "serviceUuid": "0000ffa0-0000-1000-8000-00805f9b34fb"
    }
  ]
}

const ios = {
  "uuids": [
    {
      "type": 0,
      "serviceUuid": "180A",
      "characteristic": [
        {
          "writeType": 2,
          "properties": 2,
          "permissions": 2,
          "uuid": "2A29"
        },
        {
          "writeType": 2,
          "properties": 2,
          "permissions": 2,
          "uuid": "2A24"
        },
        {
          "writeType": 2,
          "properties": 2,
          "permissions": 2,
          "uuid": "2A27"
        },
        {
          "writeType": 2,
          "properties": 2,
          "permissions": 2,
          "uuid": "2A28"
        }
      ]
    },
    {
      "type": 0,
      "serviceUuid": "FE59",
      "characteristic": [
        {
          "writeType": 40,
          "properties": 40,
          "permissions": 40,
          "uuid": "8EC90003-F315-4F60-9FB8-838830DAEA50"
        }
      ]
    },
    {
      "type": 0,
      "serviceUuid": "FFA0",
      "characteristic": [
        {
          "writeType": 22,
          "properties": 22,
          "permissions": 22,
          "uuid": "FFA1"
        },
        {
          "writeType": 4,
          "properties": 4,
          "permissions": 4,
          "uuid": "FFA2"
        }
      ]
    }
  ],
  "rssi": 0,
  "name": "N52S_069E14",
  "mac": "36FC1D75-2427-4271-966E-57F966567F28"
}


module.exports = {
  android, ios
}