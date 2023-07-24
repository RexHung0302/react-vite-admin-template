import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import defineAbility from '@/utils/casl/config/ability';

export const AbilityContext = createContext(defineAbility);
export const Can = createContextualCan(AbilityContext.Consumer);
