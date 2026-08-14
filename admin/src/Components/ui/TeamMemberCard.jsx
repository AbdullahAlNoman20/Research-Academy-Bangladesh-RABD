// FILE: src/Components/ui/TeamMemberCard.jsx  (new)
export default function TeamMemberCard({ member }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={member.image}
        alt={member.name}
        className="mb-3 h-24 w-24 rounded-full object-cover"
        width="96"
        height="96"
        loading="lazy"
      />
      <h4 className="text-sm font-bold text-primary">{member.name}</h4>
      <p className="mb-1 text-xs font-semibold text-secondary-dark">
        {member.role}
      </p>
      <p className="max-w-xs text-xs text-neutral-700">{member.bio}</p>
    </div>
  );
}
