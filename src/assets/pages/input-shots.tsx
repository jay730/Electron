import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IShot } from "../../type";

/**
 * useEffect => must rum after page loads (one time), if dependence changes
 */

interface IPlayer {
  callsign: string;
  airframe: string;
  pod: string;
}

const playerDefault: IPlayer = {
  callsign: "",
  airframe: "",
  pod: "",
};

const shotDefault = {
  id: uuidv4(),
  threatSite: "",
  timeOfLaunch: "",
  timeOfImpact: "",
  weapon: "",
  mode: "",
  result: "",
  reason: "",
};

export default function InputShots() {
  const [playerInfo, setPlayerInfo] = useState<IPlayer>(playerDefault);
  const [shots, setShots] = useState<IShot[]>([shotDefault]);

  useEffect(() => {
    console.log("hello world");
  }, [shots]);

  const handlePlayerInfoChange = (key: string, value: string) => {
    setPlayerInfo((prevState) => ({ ...prevState, [key]: value }));
  };

  const addNewShot = async () => {
    setShots((prevState) => [...prevState, shotDefault]);
  };

  const deleteShot = (index: number) => {
    // const newShots = shots.filter((_, i) => i !== index);
    // setShots(newShots);

    // Best practice to update state in react
    setShots((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleShotChange = (index: number, key: string, value: string) => {
    setShots((prevState) =>
      prevState.map((item, i) => {
        if (i === index) {
          return { ...item, [key]: value };
        }

        return item;
      })
    );
  };

  return (
    <div>
      <h1>Player Shots</h1>
      <div className="flex gap-x-2 bg-slate-600">
        <input
          type="text"
          placeholder="Call sign"
          value={playerInfo.callsign}
          onChange={(e) => handlePlayerInfoChange("callsign", e.target.value)}
        />
        <input
          type="text"
          placeholder="Airframe"
          value={playerInfo.airframe}
          onChange={(e) => handlePlayerInfoChange("airframe", e.target.value)}
        />
        <input
          type="text"
          placeholder="Pod"
          value={playerInfo.pod}
          onChange={(e) => handlePlayerInfoChange("pod", e.target.value)}
        />
      </div>

      <table style={{ marginTop: "40px" }}>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Threat Site/Type</th>
            <th>Time of launch</th>
            <th>Time of impact</th>
            <th>Weapon</th>
            <th>Mode</th>
            <th>Result</th>
            <th>Reason</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {shots.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>

                <td>
                  <input
                    type="text"
                    value={item.threatSite}
                    onChange={(e) =>
                      handleShotChange(i, "threatSite", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.timeOfLaunch}
                    onChange={(e) =>
                      handleShotChange(i, "timeOfLaunch", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.timeOfImpact}
                    onChange={(e) =>
                      handleShotChange(i, "timeOfImpact", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.weapon}
                    onChange={(e) =>
                      handleShotChange(i, "weapon", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={item.mode}
                    onChange={(e) =>
                      handleShotChange(i, "mode", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={item.result}
                    onChange={(e) =>
                      handleShotChange(i, "result", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.reason}
                    onChange={(e) =>
                      handleShotChange(i, "reason", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  {shots.length > 1 ? (
                    <button onClick={() => deleteShot(i)}>Delete</button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: "40px" }}>
        <button onClick={addNewShot}>Add Shot</button>
      </div>
    </div>
  );
}
