import { v4 as uuidV4 } from 'uuid';

export const passwordGenerator = () => {
	return uuidV4();
};

