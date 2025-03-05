import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface FontAwesomeIconProps {
  icon: IconDefinition
  className?: string
}

export function FontAwesomeIconComponent({ icon, className = '' }: FontAwesomeIconProps) {
  return (
    <FontAwesomeIcon 
      icon={icon} 
      className={className}
    />
  )
} 