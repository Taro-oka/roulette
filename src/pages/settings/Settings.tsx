import { bulkUpdateParticipants, getParticipants } from "@/api/participant";
import type { Participant } from "@/types/participant";
import { useState } from "react";

const buttonStyle =
  "p-2 bg-blue-200 rounded-md hover:bg-blue-400 transition cursor-pointer";

const inputStyle = "border rounded-sm h-10 w-60 p-2";

export const Settings = () => {
  const [participants, setParticipants] =
    useState<Participant[]>(getParticipants());
  const [additions, setAdditions] = useState<Participant[]>([]);

  const updateParticipant = (index: number, name: string) => {
    setParticipants((prev) => {
      const _prev = [...prev];
      _prev[index].name = name;
      return _prev;
    });
  };

  const deleteParticipant = (index: number) => {
    setParticipants((prev) => {
      const _prev = [...prev];
      return _prev.filter((_, i) => i !== index);
    });
  };

  const addNewSection = () => {
    setAdditions((prev) => {
      const _prev = [...prev];
      _prev.push({
        id: crypto.randomUUID(),
        name: "",
      });
      return _prev;
    });
  };

  const updateAddition = (index: number, name: string) => {
    setAdditions((prev) => {
      const _prev = [...prev];
      _prev[index].name = name;
      return _prev;
    });
  };

  const deleteAddition = (index: number) => {
    setAdditions((prev) => {
      const _prev = [...prev];
      return _prev.filter((_, i) => i !== index);
    });
  };

  const save = () => {
    bulkUpdateParticipants(
      [...participants, ...additions].filter((p) => !!p.name),
    );
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-2 pb-0">設定</h1>
      <div className="p-2">
        {!participants.length ? (
          <div className="p-2">
            <div>登録がありません</div>
          </div>
        ) : (
          <div className="p-2">
            <h2 className="mb-1">参加者</h2>
            <div className="flex flex-col gap-2">
              {participants.map((participant, i) => (
                <div key={i} className="flex gap-1 items-center">
                  <input
                    id={i.toString()}
                    className={inputStyle}
                    type="text"
                    value={participant.name}
                    onChange={(e) => updateParticipant(i, e.target.value)}
                  />
                  <button
                    className="cursor-pointer bg-slate-500 w-6 h-6 rounded-sm"
                    onClick={() => deleteParticipant(i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {additions.length > 0 && (
          <div className="p-2 mb-2 flex flex-col gap-2 bg-slate-200">
            <h2 className="mb-1">追加</h2>
            {additions.map((addition, i) => (
              <div key={i} className="flex gap-1 items-center">
                <input
                  id={i.toString()}
                  type="text"
                  className={inputStyle}
                  onChange={(e) => updateAddition(i, e.target.value)}
                  value={addition.name}
                />
                <button
                  className="cursor-pointer bg-slate-500 w-6 h-6 rounded-sm"
                  onClick={() => deleteAddition(i)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="w-60 flex flex-col gap-2 items-center">
          <button className={`${buttonStyle} w-8`} onClick={addNewSection}>
            +
          </button>
          <button className={`${buttonStyle} w-48`} onClick={save}>
            更新
          </button>
        </div>
      </div>
    </div>
  );
};
