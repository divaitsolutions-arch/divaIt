

export function ActivityFeed() {
  const activities = [
    { id: 1, user: 'JD', action: 'deployed to production', time: '2m ago', color: 'bg-blue-500' },
    { id: 2, user: 'AK', action: 'merged pull request #42', time: '1h ago', color: 'bg-purple-500' },
    { id: 3, user: 'SR', action: 'updated infrastructure', time: '3h ago', color: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-white/50 border border-ink/10 rounded-2xl p-4 shadow-sm backdrop-blur-sm h-full">
      <h3 className="text-[13px] font-semibold text-ink mb-3">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0 ${activity.color}`}>
              {activity.user}
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-ink leading-tight">
                {activity.action}
              </span>
              <span className="text-[13px] text-steel">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
