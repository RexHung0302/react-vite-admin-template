import { AnyMongoAbility, defineAbility, ExtractSubjectType, MongoQuery, Subject, SubjectRawRule } from '@casl/ability';
import { IPermission } from '@/constants/permission';

const basicAbility: IPermission = {
  rootNavigate: ['C', 'R', 'U', 'D'],
  root: ['C', 'R', 'U', 'D'],
  login: ['C', 'R', 'U', 'D'],
};

export default defineAbility(can => {
  // 基本權限
  Object.keys(basicAbility).forEach(key => {
    const CRUDArr = basicAbility[key];
    if (CRUDArr.length > 0) {
      can(CRUDArr, key);
    }
  });
});

// Ability 需從 AbilityContext Import 後，帶入此處使用
export const updateAbility = (ability: AnyMongoAbility, permissionObject: IPermission) => {
  const newRulesArray: SubjectRawRule<string, ExtractSubjectType<Subject>, MongoQuery<unknown>>[] = Object.keys(basicAbility).map(key => {
    const CRUDArr = basicAbility[key];
    return {
      action: CRUDArr,
      subject: key,
    };
  });

  // 整理新的權限
  Object.keys(permissionObject).forEach(key => {
    const CRUDArr = permissionObject[key];
    if (CRUDArr.length > 0) {
      newRulesArray.push({
        action: CRUDArr,
        subject: key,
      });
    }
  });

  ability.update(newRulesArray);
};

export const resetAbility = (ability: AnyMongoAbility) => {
  ability.update(
    Object.keys(basicAbility).map(key => {
      const CRUDArr = basicAbility[key];
      return {
        action: CRUDArr,
        subject: key,
      };
    })
  );
};
