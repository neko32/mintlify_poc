export const ReservationStateExplorer = () => {
  const transitions = {
    confirm: { from: ["pending"], to: "confirmed" },
    cancel: { from: ["pending", "confirmed"], to: "cancelled" },
    complete: { from: ["confirmed"], to: "completed" },
  };
  const [status, setStatus] = useState("pending");
  const [log, setLog] = useState(null);

  const run = (method) => {
    const transition = transitions[method];
    if (transition.from.includes(status)) {
      setLog({ ok: true, text: `${method}() -> status="${transition.to}" の新しいインスタンスを返します` });
      setStatus(transition.to);
    } else {
      setLog({ ok: false, text: `ValueError: cannot ${method} a reservation in status ${status}` });
    }
  };

  const reset = () => {
    setStatus("pending");
    setLog(null);
  };

  return (
    <div className="not-prose my-4 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        現在の status: <code className="font-semibold text-zinc-900 dark:text-zinc-100">{status}</code>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {Object.keys(transitions).map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => run(method)}
            className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-3 py-1 font-mono text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {method}()
          </button>
        ))}
        <button
          type="button"
          onClick={reset}
          className="rounded-lg px-3 py-1 text-sm text-zinc-600 dark:text-zinc-300 hover:underline"
        >
          最初に戻す
        </button>
      </div>
      <p
        aria-live="polite"
        className={`mt-3 min-h-5 font-mono text-xs ${log && !log.ok ? "text-red-700 dark:text-red-400" : "text-zinc-700 dark:text-zinc-300"}`}
      >
        {log ? log.text : "ボタンを押すと、Reservation のメソッドを呼んだときの結果を表示します。"}
      </p>
    </div>
  );
};
