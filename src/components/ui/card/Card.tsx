import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border',
        outlined: 'border-2 border-border',
        elevated: 'border-border shadow-lg',
      },
      type: {
        '1': '',
        '2': '',
      },
    },
    defaultVariants: {
      variant: 'default',
      type: '1',
    },
  }
)

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5 p-6',
  {
    variants: {
      type: {
        '1': '',
        '2': 'pb-4',
      },
    },
    defaultVariants: {
      type: '1',
    },
  }
)

const cardTitleVariants = cva(
  'text-2xl font-semibold leading-none tracking-tight',
  {
    variants: {
      type: {
        '1': 'text-lg',
        '2': 'text-xl',
      },
    },
    defaultVariants: {
      type: '1',
    },
  }
)

const cardDescriptionVariants = cva(
  'text-sm text-muted-foreground',
  {
    variants: {
      type: {
        '1': '',
        '2': 'text-base',
      },
    },
    defaultVariants: {
      type: '1',
    },
  }
)

const cardContentVariants = cva(
  'p-6 pt-0',
  {
    variants: {
      type: {
        '1': '',
        '2': 'px-6 py-4',
      },
    },
    defaultVariants: {
      type: '1',
    },
  }
)

const cardFooterVariants = cva(
  'flex items-center p-6 pt-0',
  {
    variants: {
      type: {
        '1': '',
        '2': 'px-6 pb-6',
      },
    },
    defaultVariants: {
      type: '1',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string;
  description?: string;
  showEdit?: boolean;
  showButtons?: boolean;
  showDescription?: boolean;
  buttons?: React.ReactNode;
  editButton?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant,
    type,
    title = 'Card Title',
    description = 'Some Description of the card in a few lines of the text',
    showEdit = false,
    showButtons = true,
    showDescription = true,
    buttons,
    editButton,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, type }), className)}
        {...props}
      >
        {(title || showEdit) && (
          <div className={cn(cardHeaderVariants({ type }))}>
            <div className="flex items-center justify-between">
              {title && (
                <h3 className={cn(cardTitleVariants({ type }))}>
                  {title}
                </h3>
              )}
              {showEdit && editButton && (
                <div className="flex-shrink-0">
                  {editButton}
                </div>
              )}
            </div>
            {showDescription && description && (
              <p className={cn(cardDescriptionVariants({ type }))}>
                {description}
              </p>
            )}
          </div>
        )}
        
        {children && (
          <div className={cn(cardContentVariants({ type }))}>
            {children}
          </div>
        )}
        
        {showButtons && buttons && (
          <div className={cn(cardFooterVariants({ type }))}>
            {buttons}
          </div>
        )}
      </div>
    );
  }
)

Card.displayName = 'Card'

// Sub-components for more flexible usage
const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardHeaderVariants>
>(({ className, type, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardHeaderVariants({ type }), className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof cardTitleVariants>
>(({ className, type, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(cardTitleVariants({ type }), className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof cardDescriptionVariants>
>(({ className, type, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(cardDescriptionVariants({ type }), className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardContentVariants>
>(({ className, type, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardContentVariants({ type }), className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardFooterVariants>
>(({ className, type, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardFooterVariants({ type }), className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter'

// CardImage component
export interface CardImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  aspectRatio?: 'square' | 'video' | 'auto'
  position?: 'top' | 'bottom'
}

const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ 
    className, 
    src, 
    alt, 
    aspectRatio = 'auto',
    position = 'top',
    ...props 
  }, ref) => {
    return (
      <div
        className={cn(
          'overflow-hidden',
          position === 'top' && 'rounded-t-lg',
          position === 'bottom' && 'rounded-b-lg',
          aspectRatio === 'square' && 'aspect-square',
          aspectRatio === 'video' && 'aspect-video'
        )}
      >
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn('h-full w-full object-cover', className)}
          {...props}
        />
      </div>
    )
  }
)

CardImage.displayName = 'CardImage'

// CardActions component
export interface CardActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  justify?: 'start' | 'center' | 'end' | 'between'
}

const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, children, justify = 'end', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 p-6 pt-0',
          justify === 'start' && 'justify-start',
          justify === 'center' && 'justify-center',
          justify === 'end' && 'justify-end',
          justify === 'between' && 'justify-between',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardActions.displayName = 'CardActions'

// Specialized Card variants

// StatsCard component
export interface StatsCardProps extends Omit<CardProps, 'children'> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    direction: 'up' | 'down' | 'neutral'
  }
}

const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  ({ 
    className,
    title,
    value,
    description,
    icon,
    trend,
    ...props 
  }, ref) => {
    return (
      <Card ref={ref} className={cn('p-6', className)} {...props}>
        <div className="flex items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className="flex items-center pt-1">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.direction === 'up' && 'text-success-600',
                  trend.direction === 'down' && 'text-error-600',
                  trend.direction === 'neutral' && 'text-neutral-600'
                )}
              >
                {trend.direction === 'up' && '↗'}
                {trend.direction === 'down' && '↘'}
                {trend.direction === 'neutral' && '→'}
                {' '}
                {trend.value}% {trend.label}
              </span>
            </div>
          )}
        </div>
      </Card>
    )
  }
)

StatsCard.displayName = 'StatsCard'

// FeatureCard component
export interface FeatureCardProps extends Omit<CardProps, 'children'> {
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  href?: string
  action?: {
    label: string
    onClick: () => void
  }
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ 
    className,
    title,
    description,
    icon,
    image,
    href,
    action,
    ...props 
  }, ref) => {
    return (
      <Card 
        ref={ref} 
        className={cn('overflow-hidden', href && 'cursor-pointer hover:shadow-lg transition-shadow', className)} 
        {...props}
      >
        {image && <CardImage src={image} alt={title} />}
        <CardHeader>
          {icon && <div className="h-8 w-8 mb-2 text-primary-600">{icon}</div>}
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {action && (
          <CardFooter>
            <button
              onClick={action.onClick}
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              {action.label}
            </button>
          </CardFooter>
        )}
      </Card>
    )
  }
)

FeatureCard.displayName = 'FeatureCard'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  CardActions,
  StatsCard,
  FeatureCard,
  cardVariants,
} 