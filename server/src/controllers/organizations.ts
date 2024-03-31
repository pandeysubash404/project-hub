//controllers
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ObjectId } from 'mongoose';

import Organization from 'models/organizations';


const getOrganizationById = async (req: Request, res: Response) => {
  try {
    const organization = await Organization.findOne({
      _id: req.params.orgId,
    }).populate({ path: 'members', select: '-password' });

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    return res.json(organization);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//export default {getOrganizationById};

const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await Organization.find();
    return res.json(organizations);
  } catch (err) {
    return res.status(400).json(err);
  }
};

type UpdateUserOrgReqBody = {
  orgId: ObjectId;
  userId: ObjectId;
  position: string;
  role: 'admin' | 'project manager' | 'member';
};

const updateOrganization = async (
  req: Request<ParamsDictionary, any, UpdateUserOrgReqBody>,
  res: Response
) => {
  const { orgId } = req.params;

  try {
    const updatedOrganization = await Organization.findOneAndUpdate(
      { _id: orgId },
      { $push: { members: req.body.userId } },
      { new: true, runValidators: true }
    ).populate({ path: 'members', select: '-password' });

    if (!updatedOrganization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    return res.json(updatedOrganization);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export { getOrganizationById, getAllOrganizations, updateOrganization };
//export { getOrganizationById, getAllOrganizations };
