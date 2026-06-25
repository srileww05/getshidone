import { useState } from 'react'

const steps = [
  {
    icon: '🧠',
    title: 'Brain Dump first',
    desc: 'Dump everything in your head into Brain Dump. No sorting, no pressure — just get it out.',
  },
  {
    icon: '🎯',
    title: 'Pick max 3 for Today',
    desc: 'Move only 3 tasks to Today. Three. That\'s the rule. Your brain will thank you.',
  },
  {
    icon: '⚡',
    title: 'Work on one thing',
    desc: 'Move a task to In Progress and hit the 🎯 focus button to go full focus mode.',
  },
  {
    icon: '⏱',
    title: 'Use the timer',
    desc: 'In focus mode, a 25-min Pomodoro timer helps you stay on track without spiralling.',
  },
  {
    icon: '⋯',
    title: 'Move or delete cards',
    desc: 'Hit the ⋯ button on any card to move it to another column or delete it.',
  },
  {
    icon: '✅',
    title: 'Done is done',
    desc: 'Mark tasks done from focus mode or move them to Done manually. Celebrate small wins.',
  },
]

function HelpBox() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="help-trigger"
        onClick={() => setOpen(true)}
        title="How to use getshidone"
      >
        ?
      </button>

      {open && (
        <div className="help-overlay" onClick={() => setOpen(false)}>
          <div className="help-popup" onClick={e => e.stopPropagation()}>
            <div className="help-header">
              <h2>how to use getshidone</h2>
              <button className="help-close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <p className="help-subtitle">
              built for brains that freeze when the list gets too long.
            </p>
            <div className="help-steps">
              {steps.map((step, i) => (
                <div className="help-step" key={i}>
                  <span className="help-icon">{step.icon}</span>
                  <div>
                    <p className="help-step-title">{step.title}</p>
                    <p className="help-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="help-got-it" onClick={() => setOpen(false)}>
              got it, let's go ✅
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default HelpBox